import MyGroup from './MyGroup';
import Notice from './Notice';
import StudyGroup from './StudyGroup';

export default function MainPage() {
  return (
    <div className="gap-11 flex flex-col">
      <Notice />
      <MyGroup />
      <StudyGroup />
    </div>
  );
}
