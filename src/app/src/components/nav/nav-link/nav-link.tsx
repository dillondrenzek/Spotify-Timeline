import React from 'react';
import './nav-link.scss';

export interface NavLinkProps {
  children?: React.ReactNode;
  href?: string;
  type?: 'primary' | 'secondary';
}

export const NavLink = ({ children, href }: NavLinkProps) => {
  return (
    <a className="nav-link" href={href} rel="noopener noreferrer">
      {children}
    </a>
  );
};
