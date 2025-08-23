import Link from 'next/link';
import styles from './navbar.module.css';

export default function Navbar(){
    return(
      
            <nav className={styles.navbar}>
                <h1 className={styles.navbartitle}>Banco de Harry Potter</h1>
                     <ul className={styles.navbarlink}>
                    <li>
                        <Link href="/" >Inicio</Link>
                    </li>
                    <li>
                        <Link  href="/user" >Mi cuenta</Link>
                    </li>
                    <li>
                        <Link  href="/admin" >Admin</Link>
                    </li>
                </ul>
            </nav>
    
    )
}