import UploadForm from './components/UploadForm';
import ResumeList from './components/ResumeList';
import BestResume from './components/BestResume';

const App = () => (
    <div>
        <h1>Resume Evaluator</h1>
        <UploadForm onUpload={() => window.location.reload()} />
        <BestResume />
        <ResumeList />
    </div>
);
export default App;