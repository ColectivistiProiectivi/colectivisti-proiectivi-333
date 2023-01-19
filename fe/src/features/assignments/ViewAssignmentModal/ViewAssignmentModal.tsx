import { Alert, DialogContent, Divider, styled, Typography } from '@mui/material'
import { Assignment } from '../../../types/Assignment'
import { BaseUser } from '../../../types/User'
import { SubmissionCard } from '../SubmissionCard'
import { BootstrapDialog, BootstrapDialogTitle, DialogTransition } from '../../common/BootstrapDialog'

interface ViewAssignmentModalProps {
  isOpened: boolean
  handleClose: () => void
  students: BaseUser[]
  assignment?: Assignment
}

export const ViewAssignmentModal: React.FC<ViewAssignmentModalProps> = ({
  isOpened,
  handleClose,
  students,
  assignment,
}) => {
  const handleCloseModal = () => {
    // TODO: perhaps clear some future form fields here
    handleClose()
  }

  if (!assignment) return null

  const submissions = assignment.submissions

  return (
    <BootstrapDialog
      fullScreen
      open={isOpened}
      onClose={handleCloseModal}
      disableScrollLock={true}
      TransitionComponent={DialogTransition}
    >
      <BootstrapDialogTitle onClose={handleCloseModal}>
        <BoldText variant="h4">{assignment.title}</BoldText> submissions
      </BootstrapDialogTitle>
      <StyledDialogContent>
        <Alert severity="info">Please review the following assignment submissions</Alert>
        {submissions.map((submission, idx) => (
          <SubmissionWrapper key={idx}>
            <SubmissionCard
              student={students.find(student => student.id === submission.studentId)}
              homeworkURL={submission.homeworkURL}
              grade={submission.grade}
              feedback={submission.feedback}
            />
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
