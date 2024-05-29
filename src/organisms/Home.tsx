import Sidebar from '../molecules/Sidebar';
import TitlebarBelowImageList from '../atoms/Room';

export default function Home() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <TitlebarBelowImageList />
    </div>
  );
}