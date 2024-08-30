import { PrivateRoutes } from '@/app/routes/routes';
import NavbarContent from './NavbarContent';

function Navbar({ isAuthenticated, usernameC}) {
    const rightNavbarItems = [
        { name: 'Empezar', path: `/${PrivateRoutes.HOME}` },
    ];

    return (
        <div>
            <NavbarContent isAuthenticated={isAuthenticated} usernameC={usernameC} rightNavbarItems={rightNavbarItems} />
        </div>
    );
}

export default Navbar;