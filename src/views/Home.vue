<template>
  <Container>
    <FlightTable :flights="flights"/>
  </Container>
</template>

<script>
// @ is an alias to /src
import Container from '../components/Container.vue';
import FlightTable from '../components/FlightTable.vue';

// Data
import flightData from '../data/flight.json';

export default {
  name: 'Home',
  components: {
    Container,
    FlightTable,
  },
  data() {
    return {
      flights: flightData
    };
  }
};
</script>
