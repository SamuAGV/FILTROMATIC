const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f0f2f5",
      minHeight: "100vh",
    },
    header: {
      backgroundColor: "#ffffff",
      padding: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    title: {
      fontSize: "24px",
      margin: 0,
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    logoutButton: {
      padding: "8px 15px",
      backgroundColor: "#d9534f",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    main: {
      padding: "20px",
    },
    metricsSection: {
      marginBottom: "30px",
    },
    metricsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
    },
    metricaCard: {
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    metricaValor: {
      fontSize: "24px",
      fontWeight: "bold",
      margin: "10px 0",
    },
    metricaUnidad: {
      fontSize: "14px",
      color: "#6c757d",
    },
    statusSection: {
      marginBottom: "30px",
    },
    statusGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
    },
    statusCard: {
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    statusValor: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#28a745",
    },
    activitySection: {
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    activityList: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    activityItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px",
      backgroundColor: "#f8f9fa",
      borderRadius: "5px",
    },
    activityTime: {
      fontSize: "12px",
      color: "#6c757d",
    },
  };
  
  export default styles;