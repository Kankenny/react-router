import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import classes from './Comments.module.css'
import NewCommentForm from './NewCommentForm'
import useHttp from '../../hooks/use-http'
import { getAllComments } from '../../lib/api'
import LoadingSpinner from '../UI/LoadingSpinner'
import CommentsList from './CommentsList'

const Comments = () => {
	const [isAddingComment, setIsAddingComment] = useState(false)
	const params = useParams()

	const {
		sendRequest,
		status,
		data: loadedComments,
	} = useHttp(getAllComments)

	useEffect(() => {
		sendRequest(params.quoteId)
	}, [params.quoteId, sendRequest])

	const startAddCommentHandler = () => {
		setIsAddingComment(true)
	}

	const addedCommentHandler = useCallback(() => {
		sendRequest(params.quoteId)
	}, [sendRequest, params.quoteId])

	let comments

	if (status === 'pending') {
		comments = (
			<div className="centered">
				<LoadingSpinner />
			</div>
		)
	}

	if (
		(status === 'completed' && loadedComments) ||
		loadedComments.length > 0
	) {
		comments = <CommentsList />
	}

	if ((status === 'completed' && !loadedComments) || loadedComments === 0) {
		comments = <div className="centered">No comments were added yet</div>
	}

	return (
		<section className={classes.comments}>
			<h2>User Comments</h2>
			{!isAddingComment && (
				<button className="btn" onClick={startAddCommentHandler}>
					Add a Comment
				</button>
			)}
			{isAddingComment && (
				<NewCommentForm
					quoteId={params.quoteId}
					onAddComment={addedCommentHandler}
				/>
			)}
			{comments}
		</section>
	)
}

export default Comments
