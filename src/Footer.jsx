import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.element}>
          <h3>Android App</h3>
        </div>
        <div style={styles.element}>
          <h3>Terms and Services</h3>
        </div>
        <div style={styles.element}>
          <h3>Contact</h3>
        </div>
        <div style={styles.element}>
          <h3>Sitemap</h3>
        </div>
        <div style={styles.element}>
          <h3>FAQ</h3>
        </div>
      </div>
      <div style={styles.description}>
        <p>TheFlixFlow is a Free Movies streaming site with zero ads. We let you watch movies online without having to register or paying, with over 10000 movies and TV-Series. You can also Download full movies from MoviesCloud and watch it later if you want.
</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    paddingTop:"10px",
    backgroundColor:'gray', 
    color: 'black',
    padding: '20px 0',
    textAlign: 'center',
    fontSize:"12px"
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  element: {
    flex: '1 1 200px',
    margin: '10px',
  },
  description: {
    margin:"20px 50px",
    fontSize:"11px"
  },
};

export default Footer;
