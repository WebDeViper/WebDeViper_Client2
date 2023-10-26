import MyGroup from './MyGroup';
import Notice from './Notice';
import 'swiper/css';

export default function MainPage() {
  return (
    <div className="gap-11 flex flex-col">
      <Notice />
      <MyGroup />
    </div>
  );
}
