//tsrsfc
import Login from '@/components/form/Login';
import Register from '@/components/form/Register';
import { NextPageContext } from 'next';
import * as React from 'react';

interface IAuthProps {
}

const Auth: React.FunctionComponent<IAuthProps> = ({tab}:{tab:string}) => {
  return (
    <>
    <h1>Auth Page</h1>
    {/* Register form */}
    {/* <Register /> */}
    {tab === 'signin' 
    ?  <Login />
    : <Register />
    
    }
    

    </>
  );
};

export default Auth;

export const getServerSideProps = async(ctx: NextPageContext)=>{
 const { req, query} = ctx
  const tab = query.tab ? query.tab : "signin"
  console.log(query)
  return {
    props: { tab: JSON.parse(JSON.stringify(tab))}
  }
}
