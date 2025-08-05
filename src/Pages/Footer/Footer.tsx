import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.centerNumber}>
        <h4>제주관광정보센터</h4>
        <p>064&#41; 740-6000</p>
      </div>
    </footer>
  );
}

export default Footer;
