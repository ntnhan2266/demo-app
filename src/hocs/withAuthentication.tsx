import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/route-path';
import { getAuthUserFromLocalStorage } from '@/utils/auth-storage';
import { useUser } from '@/hooks/useUser';
import { getDisplayName } from '@/utils/hoc';

const withAuthentication = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): ((_props: P) => React.JSX.Element | null) => {
  const WithAuthentication = (props: P) => {
    const authUser = getAuthUserFromLocalStorage();
    const navigate = useNavigate();
    const { setUser } = useUser();

    // Set the user in the context when the component mounts
    useEffect(() => {
      if (authUser) {
        setUser(authUser);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setUser]);

    // Redirect logic based on authentication status and current pathname
    useEffect(() => {
      if (
        !authUser &&
        window.location.pathname !== ROUTE_PATH.LOGIN &&
        window.location.pathname !== ROUTE_PATH.REGISTER
      ) {
        navigate(ROUTE_PATH.LOGIN);
      }

      if (
        authUser &&
        (window.location.pathname === ROUTE_PATH.LOGIN || window.location.pathname === ROUTE_PATH.REGISTER)
      ) {
        navigate(ROUTE_PATH.DASHBOARD_GITHUB_REPOS);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authUser]);

    // Render the wrapped component with props
    return <WrappedComponent {...props} />;
  };

  // Add displayName to the wrapped component
  WithAuthentication.displayName = `withAuthentication(${getDisplayName(WrappedComponent)})`;

  return WithAuthentication;
};

export default withAuthentication;
