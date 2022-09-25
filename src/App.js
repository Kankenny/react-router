import { Route, Switch, Redirect } from 'react-router-dom'

import AllQuotes from './routes/AllQuotes'
import QuoteDetail from './routes/QuoteDetail'
import NewQuote from './routes/NewQuote'
import Layout from './components/layout/Layout'
import NotFound from './routes/NotFound'

function App() {
	return (
		<Layout>
			<Switch>
				<Route path="/" exact>
					<Redirect to="/quotes" />
				</Route>
				<Route path="/quotes" exact>
					<AllQuotes></AllQuotes>
				</Route>
				<Route path="/quotes/:quoteId">
					<QuoteDetail></QuoteDetail>
				</Route>
				<Route path="/new-quote">
					<NewQuote></NewQuote>
				</Route>
				<Route path="*">
					<NotFound />
				</Route>
			</Switch>
		</Layout>
	)
}

export default App
