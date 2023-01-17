import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { AssignmentDto } from '../../types/Assignment'
import { AnnouncementDto } from '../../types/Announcements'

dayjs.extend(customParseFormat)

export const convertFromAssignmentsDto = (assignmentsDto: AssignmentDto[]) => {
  return assignmentsDto.map(assignmentDto => ({
    ...assignmentDto,
    deadline: dayjs(assignmentDto.deadline, 'DD/MM/YYYY'),
    startDate: dayjs(assignmentDto.startDate, 'DD/MM/YYYY'),
  }))
}

export const convertFromAnnouncementsDto = (announcementsDto: AnnouncementDto[]) => {
  return announcementsDto.map(announceDto => ({
    ...announceDto,
    createdAtDate: dayjs(announceDto.createdAtDate, 'DD/MM/YYYY'),
  }))
}
