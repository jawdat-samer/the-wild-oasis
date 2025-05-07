import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from './AppLayout.module.css';

// export default function AppLayout() {
//   return (
//     <StyledAppLayout>
//       <Header />
//       <Sidebar />

//       <Main>
//         <Container>
//           <Outlet />
//         </Container>
//       </Main>
//     </StyledAppLayout>
//   );
// }

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Header />
      <Sidebar />

      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
