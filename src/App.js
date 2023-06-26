
import './App.css';
import Header from './components/Header';
import HomePage from './views/HomePage';
import CompanyListPage from './views/CompanyListPage';
import { Route, Routes } from 'react-router-dom';
import FormPage from './views/FormPage';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
          <Route path="/" Component={ HomePage }/>
          <Route path="/companies" Component={ CompanyListPage }/>
          <Route path="/form" Component={ FormPage}/>
        </Routes>
    </div>
  );
}