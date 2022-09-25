import React, { Fragment } from 'react'
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom'

import HighlightedQuote from '../components/quotes/HighlightedQuote'
import Comments from '../components/comments/Comments'

const DUMMY_QUOTES = [
	{ id: 'q1', author: 'Max', text: 'Learning React is Fun' },
	{ id: 'q2', author: 'Ted', text: 'Learning React is Great' },
	{ id: 'q3', author: 'Charles', text: 'Learning React is Awesome' },
]

const QuoteDetail = () => {
	const match = useRouteMatch()
	const params = useParams()

	const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId)

	console.log(match)

	if (!quote) {
		return <p>No quote found</p>
	}

	return (
		<Fragment>
			<HighlightedQuote text={quote.text} author={quote.author} />
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
