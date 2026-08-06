import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import Home from '@/pages/Home';
import City from '@/pages/City';
import Cases from '@/pages/Cases';
import Investigation from '@/pages/Investigation';
import Biases from '@/pages/Biases';
import BiasDetail from '@/pages/BiasDetail';

const queryClient = new QueryClient();

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/city" component={City} />
    <Route path="/cases" component={Cases} />
    <Route path="/cases/:id" component={Investigation} />
    <Route path="/district/biases" component={Biases} />
    <Route path="/district/biases/:id" component={BiasDetail} />
    <Route component={NotFound} />
  </Switch>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter></TooltipProvider></QueryClientProvider>;
}

export default App;