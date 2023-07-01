import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const findById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId).populate('borrowedBooks', {
    ISBN: 1,
    title: 1,
    publisher: 1,
    publishedYear: 1,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find().populate('borrowedBooks', {
    ISBN: 1,
    title: 1,
    publisher: 1,
    publishedYear: 1,
  })
}

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  console.log({ userId, update })
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  }).populate('borrowedBooks', {
    ISBN: 1,
    title: 1,
    publisher: 1,
    publishedYear: 1,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

export default {
  create,
  findById,
  findAll,
  update,
}
