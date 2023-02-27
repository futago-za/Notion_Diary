import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from "./components/Layout";
import Home from './components/Home';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#8eacbc',
        main: '#607d8c',
        dark: '#34515f',
      },
      secondary: {
        light: '#5e92f3',
        main: '#1565c0',
        dark: '#5e92f3',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Home/>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
