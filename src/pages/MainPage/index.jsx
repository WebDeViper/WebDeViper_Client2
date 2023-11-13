import MyGroup from './MyGroup';
import Notice from './Notice';
import StudyGroup from './StudyGroup';

export default function MainPage() {
  return (
    <div className="container">
      <Notice />
      <MyGroup />
      <StudyGroup />
    </div>
  );
}
