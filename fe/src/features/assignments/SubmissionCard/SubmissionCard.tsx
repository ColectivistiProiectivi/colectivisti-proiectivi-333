import React, { useEffect, useState } from 'react'
import { BaseUser } from '../../../types/User'
import { Button, Link, styled, TextField, Typography } from '@mui/material'
import { useController, useFormContext } from 'react-hook-form'
import { UpdateAssignmentType } from '../ViewAssignmentModal'

interface SubmissionCardProps {
  maximumGrade: number
  submissionId: number
  handleSubmit: () => void
  student?: BaseUser
}

export const SubmissionCard: React.FC<SubmissionCardProps> = ({
  maximumGrade,
  submissionId,
  handleSubmit,
  student,
}) => {
  const { control } = useFormContext<UpdateAssignmentType>()

  const { field: submissionsField } = useController({ control, name: 'submissions' })

  const currentSubmission = submissionsField.value[submissionId]

  const [feedback, setFeedback] = useState(() => currentSubmission.feedback)
  const [grade, setGrade] = useState(() => currentSubmission.grade)

  useEffect(() => {
    submissionsField.onChange(
      submissionsField.value.map((submission, idx) =>
        idx === submissionId ? { ...currentSubmission, feedback: feedback } : submission
      )
    )
  }, [feedback])

  useEffect(() => {
    submissionsField.onChange(
      submissionsField.value.map((submission, idx) =>
        idx === submissionId ? { ...currentSubmission, grade: grade } : submission
      )
    )
  }, [grade])

  return (
    <Container>
      <FormWrapper>
        <StudentName>
          <BoldText variant="overline">Student</BoldText>
          <ReadOnlyField variant="body2">{student?.fullName}</ReadOnlyField>
        </StudentName>
        <Homework>
          <BoldText variant="overline">Homework File URL</BoldText>
          <ReadOnlyFieldHomeWork variant="body2" title={currentSubmission.homeworkURL}>
            <Link href={currentSubmission.homeworkURL} target="_blank">
              {currentSubmission.homeworkURL}
            </Link>
          </ReadOnlyFieldHomeWork>
        </Homework>
        <Grade>
          <BoldText variant="overline">Grade</BoldText>
          <GradeField
            value={grade}
            onChange={e => setGrade(Number(e.target.value))}
            color="secondary"
            type="text"
            variant="standard"
          />
        </Grade>
        <Feedback>
          <BoldText variant="overline">Feedback</BoldText>
          <FeedbackField
            multiline
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            color="secondary"
            type="text"
            variant="standard"
          />
        </Feedback>
        <SubmitWrapper>
          <Button onClick={handleSubmit} disabled={grade > maximumGrade}>
            Update Submission
          </Button>
        </SubmitWrapper>
      </FormWrapper>
    </Container>
  )
}

const Container = styled('div')`
  display: flex;
`

const StudentName = styled('div')`
  display: flex;
  flex-direction: column;
  width: 10%;
`

const Homework = styled('div')`
  display: flex;
  flex-direction: column;
  width: 20%;
`

const Grade = styled('div')`
  display: flex;
  flex-direction: column;
  width: 5%;
`

const Feedback = styled('div')`
  display: flex;
  flex-direction: column;
  width: 25%;
`

const FormWrapper = styled('form')`
  display: flex;
  width: 100%;
  gap: 10px;
`

const GradeField = styled(TextField)`
  width: 40%;
`

const FeedbackField = styled(TextField)`
  width: 90%;
`

const BoldText = styled(Typography)`
  font-weight: bold;
`

const SubmitWrapper = styled('div')`
  align-self: center;
`

const ReadOnlyField = styled(Typography)`
  padding: 5px 0;
`

const ReadOnlyFieldHomeWork = styled(Typography)`
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`
