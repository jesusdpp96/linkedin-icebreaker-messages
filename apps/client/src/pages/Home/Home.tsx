import React, { useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Layout } from "../../components";

export const Home = () => {
  // State for the counter
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Function to increment the counter
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // State for the health status
  const [healthStatus, setHealthStatus] = useState<string | null>(null);

  // Function to fetch health status
  const fetchHealthStatus = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/health");
      if (response.ok) {
        const data = await response.json();
        setHealthStatus(data.status || "Healthy");
      } else {
        setHealthStatus("Error");
      }
    } catch (error) {
      setHealthStatus("Error");
    } finally {
      setIsLoading(false);
      handleIncrement();
    }
  };

  // Fetch health status on component mount
  React.useEffect(() => {
    fetchHealthStatus();
  }, []);

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", mt: 10 }}>
          <Typography variant="h4" gutterBottom>
            Health Requests Counter: {count}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchHealthStatus}
          >
            Request Health
          </Button>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Health Status: {isLoading ? "Loading..." : healthStatus}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};
