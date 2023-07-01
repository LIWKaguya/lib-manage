import { Request } from 'express'

type ReqDictionary = {}
type ReqBody = {}
export type ReqQuery = {
  title: string
  categories: string
  authors: string
  status: string
}
type ResBody = {}

export type CustomRequest = Request<
  ReqDictionary,
  ResBody,
  ReqBody,
  Partial<ReqQuery>
>

type allAggregate = {
  $all: string[] | undefined
}

type regexAggregate = {
  $regex: RegExp | undefined
}

export type CustomFilterQuery = {
  title: regexAggregate
  categories: allAggregate
  authors: allAggregate
  status: string
}

export interface ParsedToken {
  payload: {
    email: string
    email_verified: string
    name: string
    picture: string
    given_name: string
    family_name: string
    locale: string
  }
}

export interface VerifiedCallback {
  (error: any, user?: any, info?: any): void
}
