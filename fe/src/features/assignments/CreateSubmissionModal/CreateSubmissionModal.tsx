import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Role } from '../../../types/User'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { Assignment, AssignmentRequestDto, Submission } from '../../../types/Assignment'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectUserData } from '../../account/selectors'
import { updateAssignment } from '../actions'
import clipSrc from './icons/clip.svg'

dayjs.extend(isSameOrAfter)

interface CreateSubmissionModalProps {
  isOpened: boolean
  handleClose: () => void
  assignment?: Assignment
}

export const CreateSubmissionModal: React.FC<CreateSubmissionModalProps> = ({ isOpened, handleClose, assignment }) => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector(selectUserData)
  const role = userData?.role

  const [currentSubmission, setCurrentSubmission] = useState<Submission>({
    studentId: userData?.id || 0,
    feedback: '',
    grade: 0,
    homeworkURL: '',
  })

  const submissionForCurrentStudent = assignment?.submissions.find(assignment => assignment.studentId === userData?.id)

  useEffect(() => {
    // Fill with pre-existing data when updating
    if (assignment) {
      if (submissionForCurrentStudent) {
        setCurrentSubmission(assignment.submissions[assignment.submissions.indexOf(submissionForCurrentStudent)])
      }
    }
  }, [assignment])

  const handleAssignmentSubmit = async () => {
    if (assignment) {
      const updatedAssignment: AssignmentRequestDto = {
        title: assignment.title,
        authorId: assignment.author.id,
        startDate: assignment.startDate.format('DD-MM-YYYY HH:mm'),
        deadline: assignment.deadline.format('DD-MM-YYYY HH:mm'),
        studentIds: assignment.studentIds,
        submissions: submissionForCurrentStudent
          ? assignment.submissions.map(submission =>
              submission.studentId === userData?.id ? currentSubmission : submission
            )
          : [...assignment.submissions, currentSubmission],
        description: assignment.description,
        maximumGrade: assignment.maximumGrade,
      }

      dispatch(updateAssignment({ assignment: updatedAssignment, assignmentId: assignment.id }))
    }
  }

  const handleCloseModal = () => {
    setCurrentSubmission({
      studentId: userData?.id || 0,
      feedback: '',
      grade: 0,
      homeworkURL: '',
    })
    handleClose()
  }

  const updateHomeWorkUrl = (homeworkURL: string) => {
    setCurrentSubmission(prev => ({ ...prev, homeworkURL }))
  }

  // Shouldn't be the case; just making sure
  if (role !== Role.STUDENT) return null

  return (
    <Dialog open={isOpened} onClose={handleCloseModal} disableScrollLock={true}>
      <StyledDialogTitle>Assignment</StyledDialogTitle>
      <Clip src={clipSrc} alt="clip-icon" />
      <FormWrapper onSubmit={handleAssignmentSubmit}>
        <StyledDialogContent>
          <DialogInstructions>Provide a File URL to your homework</DialogInstructions>
          <TextField
            label="Homeworl File URL"
            color="secondary"
            value={currentSubmission.homeworkURL}
            onChange={e => updateHomeWorkUrl(e.target.value)}
          />
          {currentSubmission.grade !== 0 && (
            <CardItem>
              <StyledLabel variant="overline">Grade</StyledLabel>
              <Typography variant="body2">
                <BoldGrade variant="body2">{currentSubmission.grade}</BoldGrade> / {assignment?.maximumGrade || 0}
              </Typography>
            </CardItem>
          )}
          {currentSubmission.feedback !== '' && (
            <CardItem>
              <StyledLabel variant="overline">Feedback</StyledLabel>
              <Typography variant="body2">{currentSubmission.feedback}</Typography>
            </CardItem>
          )}
          <Alert severity="info">Your grade and mentor&#39;s feedback will appear here</Alert>
        </StyledDialogContent>
        <DialogActions>
          <Button color="error" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            disabled={!currentSubmission.homeworkURL}
            color="info"
            variant="outlined"
            onClick={handleAssignmentSubmit}
          >
            Turn in
          </Button>
        </DialogActions>
      </FormWrapper>
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

const StyledLabel = styled(Typography)`
  color: #777;
`

const CardItem = styled('div')`
  display: flex;
  flex-direction: column;
`

const BoldGrade = styled(Typography)`
  display: inline;
  font-weight: bold;
`
