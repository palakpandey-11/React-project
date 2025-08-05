import react from 'react'
import { Box, Typography, Button, Grid, Divider,  Breadcrumbs,         // ← add this
  Link as MuiLink    } from "@mui/material";
  import { Link as RouterLink } from 'react-router-dom';
import Header from './Header'
import { useNavigate } from 'react-router-dom';

export default function FormSixteen(){
    const navigate = useNavigate();

    return(
        <>
        <Header/>

         {/* Breadcrumbs */}
              <Box sx={{ p: 2, bgcolor: 'rgba(10,20,40,0.7)' }}>
                <Breadcrumbs separator=">" sx={{ '& .MuiBreadcrumbs-separator': { color: 'rgba(255,255,255,0.5)' }}}>
                  <MuiLink component={RouterLink} to="/" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Home
                  </MuiLink>
                  <MuiLink component={RouterLink} to="/updatepayroll" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Payroll
                  </MuiLink>
                  <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>
                    Form 16
                  </Typography>
                </Breadcrumbs>
              </Box>
        
 <Box sx={{ p: { xs: 1, md: 3 }, maxWidth: 1400, mx: "auto" }}>
        {/* Orange Banner */}
        <Box
          sx={{
            background: "#fff5eb34",
            border: "1.5px solid #9c948bff",
            borderRadius: 2,
            p: { xs: 2, md: 3 },
            mt: 2,
            mb: 3,
          }}
        >
          <Typography fontWeight={600} fontSize={22} sx={{ mb: 1, color: "#d3c3afff" }}>
            Know about your Form 16!
          </Typography>
          <Typography color="#98948eff" sx={{ mb: 2 }}>
            Form 16 includes Part A that is downloaded from traces site and Part B that will be generated through greytHR.
            These forms can be signed by authorized person and published to the respective employees. They can also be digitally signed.
            <br />
            <br />
            The current settings for Form 16 generation are shown below. Please verify if they are as correct before you generate the Form 16 documents.
            If there are any missing values or if any setting is incorrect, you can update the settings from the Form 16 Settings page.
          </Typography>
          {/* Settings Section */}
          <Box
            sx={{
              background: "#fffdf98e",
              border: "1px dashed #aaa",
              borderRadius: 2,
              p: { xs: 2, md: 4 },
              mt: 2,
              position: "relative",
            }}
          >
            <Typography fontWeight={700} fontSize={21} sx={{ mb: 2, letterSpacing: 0.2 }}>
              CURRENT SETTINGS
            </Typography>

            <Typography
              sx={{
                color: "#e53935",
                fontSize: 13.5,
                fontWeight: 400,
                position: "absolute",
                right: { xs: 12, md: 30 },
                top: 18,
              }}
            >
              Options marked in RED are mandatory to proceed.
            </Typography>
            <Divider sx={{ my: 2, borderColor: "#747474ff" }} />

            {/* Three Columns */}
            <Grid container spacing={3}>

              {/* Column 1 */}
              <Grid item xs={12} md={4}>
                <Typography fontWeight={500} fontSize={20} sx={{ color: "#6f6b6bff", mb: 2 }}>
                  Responsible Person's Details
                </Typography>
                <Typography sx={{ color: "#e53935", fontWeight: 600, mb: 0.5 }}>
                  Name: ?
                </Typography>
                <Typography sx={{ color: "#e53935", fontWeight: 600, mb: 0.5 }}>
                  Designation: ?
                </Typography>
                <Typography sx={{ color: "#e53935", fontWeight: 600, mb: 0.5 }}>
                  Father's Name: ?
                </Typography>
                <Typography sx={{ color: "#e53935", fontWeight: 600, mb: 2 }}>
                  Location: ?
                </Typography>
                <Typography fontWeight={500} sx={{ color: "#474747" }}>
                  Signing Date: 25-Jul-2025
                </Typography>
              </Grid>

              {/* Column 2 */}
              <Grid item xs={12} md={4}>
                <Typography fontWeight={500} fontSize={20} sx={{ color: "#6f6b6bff", mb: 2 }}>
                  Form 16 Details
                </Typography>
                <Typography fontWeight={600} sx={{ mb: 1 }}>
                  Generated Date: 25-Jul-2025
                </Typography>
                <Typography sx={{ color: "#e53935", fontWeight: 600, mb: 2 }}>
                  TDS Circle Address: ?
                </Typography>

                <Typography fontWeight={500} fontSize={19} sx={{ color: "#6f6b6bff", mb: 1 }}>
                  Part B Configuration
                </Typography>
                <Typography sx={{ color: "#a23a25", fontWeight: 700, fontSize: 17 }}>
                  ✖ Show with Previous employment
                </Typography>
                <Typography sx={{ color: "#1a6b1a", fontWeight: 700, fontSize: 17 }}>
                  ✔ Show with Form 12 B(A)
                </Typography>
                <Typography sx={{ color: "#1a6b1a", fontWeight: 700, fontSize: 17 }}>
                  ✔ Show Annexure B
                </Typography>
                <Typography sx={{ color: "#a23a25", fontWeight: 700, fontSize: 17 }}>
                  ✖ Suppress Zero Tax
                </Typography>
                <Typography sx={{ color: "#1a6b1a", fontWeight: 700, fontSize: 17 }}>
                  ✔ Suppress Zero Exemptions
                </Typography>
                <Typography sx={{ color: "#1a6b1a", fontWeight: 700, fontSize: 17 }}>
                  ✔ Enable GreytHR Part B Verification Form
                </Typography>
              </Grid>

              {/* Column 3 */}
              <Grid item xs={12} md={4}>
                <Typography fontWeight={500} fontSize={20} sx={{ color: "#6f6b6bff", mb: 2 }}>
                  Form 16 Generation
                </Typography>
                <Typography sx={{ color: "#1a6b1a", fontWeight: 700, fontSize: 17 }}>
                  ✔ Show Form 16 Cover Page
                </Typography>
                <Typography sx={{ color: "#1a6b1a", fontWeight: 700, fontSize: 17 }}>
                  ✔ Merge Part A and Part B
                </Typography>
                <Typography sx={{ color: "#1a6b1a", fontWeight: 700, fontSize: 17 }}>
                  ✔ Use Default appearance for the Digital Signature
                </Typography>
                <Typography sx={{ color: "#a23a25", fontWeight: 700, fontSize: 17 }}>
                  ✖ Whether Form 16 should be Digitally signed
                </Typography>

                <Typography fontWeight={500} fontSize={19} sx={{ color: "#6f6b6bff", mb: 1, mt: 3 }}>
                  Company Details
                </Typography>
                <Typography>
                  Company Name: Stibium Software Pvt Ltd
                </Typography>
                <Typography>
                  Company Address: 30/31, 100 Feet Road, II Block,
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  Koramangala, Bangalore - 560034
                </Typography>
                <Typography>
                  PAN: ABCTY1234D
                </Typography>
                <Typography>
                  TAN: PDES03028F
                </Typography>
              </Grid>
            </Grid>
            {/* Buttons */}
            <Box sx={{ textAlign: "center", mt: 6 }}>
              <Button
                variant="contained"
                sx={{
                  mr: 3,
                  bgcolor: "#596981ff",
                  ":hover": { bgcolor: "#4977b6" },
                  fontWeight: 600,
                  fontSize: 18,
                  px: 5
                }}
              >
                Change Settings
              </Button>
              <Button
              onClick={() => navigate('/form16/procced')} 
                variant="contained"
                sx={{
                  bgcolor: "#3768b7ff",
                  ":hover": { bgcolor: "#5e82b6ff" },
                  fontWeight: 600,
                  fontSize: 18,
                  px: 5
                }}
              >
                OK Proceed
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}