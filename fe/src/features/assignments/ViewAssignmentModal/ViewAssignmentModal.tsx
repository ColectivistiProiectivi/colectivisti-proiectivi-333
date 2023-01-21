import { Alert, DialogContent, Divider, styled, Typography } from '@mui/material'
import { Assignment, AssignmentRequestDto, Submission } from '../../../types/Assignment'
import { BaseUser } from '../../../types/User'
import { SubmissionCard } from '../SubmissionCard'
import { BootstrapDialog, BootstrapDialogTitle, DialogTransition } from '../../common/BootstrapDialog'
import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { updateAssignment } from '../actions'
import { useAppDispatch } from '../../../redux/hooks'

interface ViewAssignmentModalProps {
  isOpened: boolean
  handleClose: () => void
  students: BaseUser[]
  assignment?: Assignment
}

export type UpdateAssignmentType = {
  submissions: Submission[]
}

export const ViewAssignmentModal: React.FC<ViewAssignmentModalProps> = ({
  isOpened,
  handleClose,
  students,
  assignment,
}) => {
  const dispatch = useAppDispatch()
  const formMethods = useForm<UpdateAssignmentType>()
  const { setValue, getValues } = formMethods

  useEffect(() => {
    // Fill with pre-existing data when updating
    if (assignment) {
      setValue('submissions', assignment.submissions)
    }
  }, [assignment])

  const handleCloseModal = () => {
    // TODO: perhaps clear some future form fields here
    handleClose()
  }

  const handleAssignmentSubmit = async () => {
    if (assignment) {
      const updatedAssignment: AssignmentRequestDto = {
        title: assignment.title,
        authorId: assignment.author.id,
        startDate: assignment.startDate.format('DD-MM-YYYY HH:mm'),
        deadline: assignment.deadline.format('DD-MM-YYYY HH:mm'),
        studentIds: assignment.studentIds,
        submissions: getValues('submissions'),
        description: assignment.description,
        maximumGrade: assignment.maximumGrade,
      }

      dispatch(updateAssignment({ assignment: updatedAssignment, assignmentId: assignment.id }))
    }
  }

  if (!assignment) return null

  const submissions = assignment.submissions

  return (
    <BootstrapDialog fullScreen open={isOpened} onClose={handleCloseModal} TransitionComponent={DialogTransition}>
      <BootstrapDialogTitle onClose={handleCloseModal}>
        <BoldText variant="body2">{assignment.title}</BoldText> submissions
      </BootstrapDialogTitle>
      <StyledDialogContent>
        {submissions.length > 0 && (
          <Alert severity="info">
            Please review the following assignment submissions.{' '}
            <BoldText variant="body2">Note: Maximum grade that can be given is {assignment.maximumGrade}</BoldText>
          </Alert>
        )}
        {submissions.length === 0 && <Alert severity="warning">There is no assignment submission to review yet!</Alert>}
        {submissions.map((submission, idx) => (
          <SubmissionWrapper key={idx}>
            <FormProvider {...formMethods}>
              <SubmissionCard
                student={students.find(student => student.id === submission.studentId)}
                submissionId={idx}
                maximumGrade={assignment?.maximumGrade || 0}
                handleSubmit={handleAssignmentSubmit}
              />
            </FormProvider>
            <Divider />
          </SubmissionWrapper>
        ))}
      </StyledDialogContent>
    </BootstrapDialog>
  )
}

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 40px;
`

const SubmissionWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const BoldText = styled(Typography)`
  font-weight: bold;
`
