import type React from "react";
import { Card, CardContent, Box, Skeleton } from "@mui/material";

const SkeletonMessageCard: React.FC = () => {
  return (
    <Card sx={{ mb: 3, bgcolor: "#f5f5f5", borderRadius: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Skeleton variant="rectangular" width={100} height={24} />
          <Skeleton variant="rectangular" width={150} height={36} />
        </Box>

        <Card sx={{ bgcolor: "white", boxShadow: 1 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                sx={{ mr: 1 }}
              />
              <Box sx={{ width: "100%" }}>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="80%" />
              </Box>
            </Box>

            <Skeleton variant="rectangular" height={1} sx={{ my: 1.5 }} />

            <Box sx={{ display: "flex", mt: 2 }}>
              <Skeleton
                variant="circular"
                width={32}
                height={32}
                sx={{ mr: 1.5 }}
              />
              <Box sx={{ width: "100%" }}>
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="95%" />
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Skeleton variant="text" width={80} />
            <Box sx={{ display: "flex", gap: 1 }}>
              <Skeleton variant="text" width={50} />
              <Skeleton variant="text" width={50} />
            </Box>
          </Box>
          <Skeleton variant="rectangular" width={120} height={36} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SkeletonMessageCard;
