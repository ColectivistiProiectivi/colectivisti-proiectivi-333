import React, { useEffect } from 'react'
import { BaseUser } from '../../../types/User'
import { Button, styled, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

interface SubmissionFormType {
  studentId?: number
  homeworkURL?: string
  grade?: number
  feedback?: string
}

interface SubmissionCardProps {
  student?: BaseUser
  homeworkURL?: string
  grade?: number
  feedback?: string
}

export const SubmissionCard: React.FC<SubmissionCardProps> = ({ student, homeworkURL, grade, feedback }) => {
  const { handleSubmit, setValue, register } = useForm<SubmissionFormType>()

  useEffect(() => {
    if (grade) {
      setValue('grade', grade)
    }

    if (feedback) {
      setValue('feedback', feedback)
    }
  }, [grade, feedback])

  const handleUpdateSubmission: SubmitHandler<SubmissionFormType> = _formData => {
    // console.log(_formData)
  }

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit(handleUpdateSubmission)}>
        <StudentName>
          <BoldText variant="overline">Student</BoldText>
          <ReadOnlyField variant="body2">{student && student.fullName}</ReadOnlyField>
        </StudentName>
        <Homework>
          <BoldText variant="overline">Homework File URL</BoldText>
          <ReadOnlyField variant="body2">{homeworkURL}</ReadOnlyField>
        </Homework>
        <Grade>
          <BoldText variant="overline">Grade</BoldText>
          <GradeField {...register('grade')} color="secondary" type="text" variant="standard" />
        </Grade>
        <Feedback>
          <BoldText variant="overline">Feedback</BoldText>
          <FeedbackField multiline {...register('feedback')} color="secondary" type="text" variant="standard" />
        </Feedback>
        <SubmitWrapper>
          <Button>Update Submission</Button>
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
