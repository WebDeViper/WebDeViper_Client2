import MyGroup from './MyGroup';
import Notice from './Notice';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function MainPage() {
  return (
    <div className="gap-11 flex flex-col">
      <Notice />
      <MyGroup />
    </div>
  );
}
