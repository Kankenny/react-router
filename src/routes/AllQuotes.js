import React from 'react'

import QuoteList from '../components/quotes/QuoteList'

const DUMMY_QUOTES = [
	{ id: 'q1', author: 'Max', text: 'Learning React is Fun' },
	{ id: 'q2', author: 'Ted', text: 'Learning React is Great' },
	{ id: 'q3', author: 'Charles', text: 'Learning React is Awesome' },
]

const AllQuotes = () => {
	return <QuoteList quotes={DUMMY_QUOTES}></QuoteList>
}

export default AllQuotes
