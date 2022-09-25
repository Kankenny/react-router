import React, { Fragment, useEffect } from 'react'
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom'
import useHttp from '../hooks/use-http'
import { getSingleQuote } from '../lib/api'

import HighlightedQuote from '../components/quotes/HighlightedQuote'
import Comments from '../components/comments/Comments'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const QuoteDetail = () => {
	const match = useRouteMatch()
	const params = useParams()

	const { quoteId } = params

	const {
		sendRequest,
		status,
		data: loadedQuote,
		error,
	} = useHttp(getSingleQuote, true)

	useEffect(() => {
		sendRequest(quoteId)
	}, [sendRequest, quoteId])

	if (status === 'pending') {
		return (
			<div className="centered">
				<LoadingSpinner />
			</div>
		)
	}

	if (error) {
		return <p className="centered">{error}</p>
	}

	if (!loadedQuote.text) {
		return <p>No quote found!</p>
	}

	return (
		<Fragment>
			<HighlightedQuote
				text={loadedQuote.text}
				author={loadedQuote.author}
			/>
			<Route path={`/quotes/${params.quoteId}`} exact>
				<div className="centered">
					<Link className="btn--flat" to={`${match.url}`}>
						Load Comments
					</Link>
				</div>
			</Route>
			<Route path={`${match.path}/comments`}>
				<Comments></Comments>
			</Route>
		</Fragment>
	)
}

export default QuoteDetail
