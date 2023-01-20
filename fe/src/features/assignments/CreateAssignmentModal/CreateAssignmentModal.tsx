import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  TextField,
} from '@mui/material'
import React, { useEffect } from 'react'
import { FormProvider, SubmitHandler, useController, useForm } from 'react-hook-form'
import { BaseUser, Role } from '../../../types/User'
import { FormInput } from '../../common/FormInput'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import clipSrc from './icons/clip.svg'
import { Assignment, AssignmentRequestDto } from '../../../types/Assignment'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectUserData } from '../../account/selectors'
import { createAssignment, updateAssignment } from '../actions'

dayjs.extend(isSameOrAfter)

export type CreateAssignmentType = {
  title: string
  author: BaseUser
  startDate: Dayjs
  deadline: Dayjs
  students: BaseUser[]
  description: string
  maximumGrade: number
}

interface CreateAssignmentModalProps {
  isOpened: boolean
  handleClose: () => void
  students: BaseUser[]
  assignment?: Assignment
}

export const CreateAssignmentModal: React.FC<CreateAssignmentModalProps> = ({
  isOpened,
  handleClose,
  students,
  assignment,
}) => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector(selectUserData)
  const role = userData?.role
  // const now = dayjs()

  const formMethods = useForm<CreateAssignmentType>()
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = formMethods

  const editMode = !!assignment

  const { field: studentsField } = useController({ name: 'students', control })
  const { field: startDateField } = useController({
    name: 'startDate',
    control,
    rules: {
      required: true,
      // validate: startDateValue => !editMode && startDateValue.isSameOrAfter(now.subtract(1, 'hour')),
    },
  })
  const { field: deadlineField } = useController({
    name: 'deadline',
    control,
    rules: {
      required: true,
      validate: deadlineValue => deadlineValue.isAfter(startDateField.value) || 'Deadline should be after Start Date',
    },
  })

  useEffect(() => {
    // Fill with pre-existing data when updating
    if (assignment) {
      // Set user from the fetched users list Assignment !== CreateAssignmentFormType
      setValue('title', assignment.title)

      // filter all students that are not already selected from all the possible students
      setValue(
        'students',
        students.filter(student => assignment.studentIds.includes(student.id))
      )

      setValue('startDate', assignment.startDate)
      setValue('deadline', assignment.deadline)
      setValue('description', assignment.description)
      setValue('maximumGrade', assignment.maximumGrade)
      setValue('author', assignment.author)
    } else {
      if (role === Role.MENTOR && userData) {
        const mentorObj: BaseUser = {
          id: userData?.id || 0,
          fullName: userData?.fullName || '',
          email: userData?.email || '',
          role: Role.MENTOR,
        }

        setValue('author', mentorObj)
      }
    }
  }, [assignment])

  const handleAssignmentSubmit: SubmitHandler<CreateAssignmentType> = async formData => {
    // TODO: Map studentIds to students AND authorId to author before sending data / Convert dates to string
    // TODO: Dispatch create assignment action
    // console.log(formData)

    if (editMode && assignment) {
      const updatedAssignment: AssignmentRequestDto = {
        title: formData.title,
        authorId: assignment.author.id || formData.author.id,
        startDate: formData.startDate.format('DD-MM-YYYY HH:mm'),
        deadline: formData.deadline.format('DD-MM-YYYY HH:mm'),
        studentIds: formData.students.map(student => student.id),
        submissions: assignment.submissions || [],
        description: formData.description,
        maximumGrade: formData.maximumGrade,
      }

      dispatch(updateAssignment({ assignment: updatedAssignment, assignmentId: assignment.id })).then(() => {
        handleCloseModal()
      })
    } else {
      const newAssignment: AssignmentRequestDto = {
        title: formData.title,
        authorId: formData.author.id,
        startDate: formData.startDate.format('DD-MM-YYYY HH:mm'),
        deadline: formData.deadline.format('DD-MM-YYYY HH:mm'),
        studentIds: formData.students.map(student => student.id),
        submissions: [],
        description: formData.description,
        maximumGrade: formData.maximumGrade,
      }

      dispatch(createAssignment(newAssignment)).then(() => {
        handleCloseModal()
      })
    }
  }

  const handleCloseModal = () => {
    reset({
      title: '',
      startDate: undefined,
      deadline: undefined,
      students: [],
      description: '',
      maximumGrade: 0,
    })
    handleClose()
  }

  // Shouldn't be the case; just making sure
  if (role !== Role.MENTOR) return null

  return (
    <Dialog open={isOpened} onClose={handleCloseModal} disableScrollLock={true}>
      <StyledDialogTitle>{editMode ? 'Update' : 'Create'} Assignment</StyledDialogTitle>
      <Clip src={clipSrc} alt="clip-icon" />
      <FormProvider {...formMethods}>
        <FormWrapper onSubmit={handleSubmit(handleAssignmentSubmit)}>
          <StyledDialogContent>
            <DialogInstructions>Fill in the details for {editMode ? 'this' : 'the new'} assignment</DialogInstructions>
            <FormInput
              label="Title"
              fieldName="title"
              options={{
                required: true,
                minLength: {
                  value: 3,
                  message: 'Title should be min 3 characters long',
                },
              }}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <Autocomplete
              multiple
              options={students || []}
              getOptionLabel={option => option.fullName || ''}
              isOptionEqualToValue={(option, value) => option.email === value.email}
              value={studentsField.value || []}
              filterSelectedOptions
              renderInput={params => (
                <TextField
                  {...params}
                  helperText={errors.students?.message}
                  error={!!errors.students}
                  color="secondary"
                  InputLabelProps={{ shrink: true }}
                  label="Students"
                />
              )}
              onChange={(_, newStudents) => {
                clearErrors('students')

                if (newStudents.length < 1) {
                  setError('students', new Error('Must have 1 selected'))
                }

                studentsField.onChange(newStudents, { shouldDirty: true })
                studentsField.onBlur()
              }}
            />
            <DesktopDatePicker
              label="Start Date"
              inputFormat="DD/MM/YYYY"
              value={startDateField.value || null}
              onChange={(newStartDate: Dayjs | null) => {
                startDateField.onChange(newStartDate || '', { shouldDirty: true })
                startDateField.onBlur()
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  color="secondary"
                  helperText={errors.startDate?.message}
                  error={!!errors.startDate}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
            <DesktopDatePicker
              label="Deadline"
              inputFormat="DD/MM/YYYY"
              value={deadlineField.value || null}
              onChange={(newDeadline: Dayjs | null) => {
                deadlineField.onChange(newDeadline || '', { shouldDirty: true })
                deadlineField.onBlur()
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  color="secondary"
                  helperText={errors.deadline?.message}
                  error={!!errors.deadline}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
            <FormInput
              label="Description"
              fieldName="description"
              options={{ maxLength: 200, required: true }}
              error={!!errors.description}
              helperText="Max 200 characters"
              multiline
              rows={3}
            />
            <FormInput
              label="Maximum Grade"
              fieldName="maximumGrade"
              options={{ maxLength: 5, required: true }}
              error={!!errors.maximumGrade}
              helperText={errors.maximumGrade?.message}
            />
          </StyledDialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="error">
              Cancel
            </Button>
            <Button color="info" type="submit" variant="outlined">
              {editMode ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </FormWrapper>
      </FormProvider>
    </Dialog>
  )
}

const FormWrapper = styled('form')`
  gap: 4px;
  width: 500px;
`

const StyledDialogTitle = styled(DialogTitle)`
  background: #ddd;
`

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const DialogInstructions = styled(DialogContentText)`
  margin-bottom: 15px;
`

const Clip = styled('img')`
  user-select: none;
  -webkit-user-drag: none;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 0;
  opacity: 0.8;
`
