import { Menu, Container, Image, Icon } from "semantic-ui-react";
import Link from 'next/Link'
import Router ,{ useRouter } from 'next/router'
import NProgress from 'NProgress'

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function Header() {
  const router = useRouter()
  
  const isActive = route => route === router.pathname;
  const user = false;

  return (
    <Menu fluid id='menu' stackable inverted>
      <Container text>
       <Link href="/">
          <Menu.Item header active={isActive('/')}>
           <Image
             size="mini"
             src="/static/logo.svg"
             style={{marginRight:'1em'}}
           />
           Market Place
          </Menu.Item>
       </Link>
       <Link href="/cart">
          <Menu.Item header active={isActive('/cart')}>
           <Icon
             name="cart"
             size="large"
           />
           Cart
          </Menu.Item>
       </Link>
      { user && (<Link href="/create">
          <Menu.Item header active={isActive('/create')}>
           <Icon
             name="add square"
             size="large"
           />
           create
          </Menu.Item>
       </Link>
       )}

       { user ? (
         <>
       <Link href="/account" active={isActive('/account')}>
          <Menu.Item header>
           <Icon
             name="user"
             size="large"
           />
           account
          </Menu.Item>
       </Link>
       
          <Menu.Item header >
           <Icon
             name="sign out"
             size="large"
           />
           log out
          </Menu.Item>

          </>
       ) :

          (<>

          <Link href="/login">
          <Menu.Item header  active={isActive('/login')}>
           <Icon
             name="sign in"
             size="large"
           />
           log in
          </Menu.Item>
       </Link>
       <Link href="/signup">
          <Menu.Item header  active={isActive('/signup')}>
           <Icon
             name="signup"
             size="large"
           />
           sign up
          </Menu.Item>
       </Link>
       </>
       )}
       
      </Container>
    </Menu>
  )
}

export default Header;
