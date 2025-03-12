const ResumeCard = ({ resume, isBestMatch }) => (
    <div className={`p-4 border rounded-lg shadow-md ${isBestMatch ? 'bg-green-100' : ''}`}>
      <h2 className="text-xl font-bold">{resume.filename}</h2>
      <p>Similarity Score: <strong>{resume.score.toFixed(2)}%</strong></p>
      {isBestMatch && <p className="text-green-600 font-semibold">Best Match ✅</p>}
    </div>
  );
  
  export default ResumeCard;
  