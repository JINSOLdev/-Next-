import Links from './links/Links';
import styles from './navbar.module.css';

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div>Logo</div>
            <div>
                {/* <Link href={'/'}>Homepage</Link>
                <Link href={'/about'}>About</Link>
                <Link href={'/contact'}>Contact</Link> */}
                <Links />
            </div>
        </div>
    );
};

export default Navbar;
