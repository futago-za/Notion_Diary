import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CalendarBoard from "./CalendarBoard";
import TodayBoard from "./TodayBoard";

const Home = () => {
  return (
    <Container maxWidth={false} sx={{py: 3}}>
      <Grid container spacing={3} sx={{px: 3}}>
        <Grid item xs={4}>
          <TodayBoard/>
        </Grid>
        <Grid item xs={8}>
          <CalendarBoard />
        </Grid>
      </Grid>
    </Container>
  )
};

export default Home;