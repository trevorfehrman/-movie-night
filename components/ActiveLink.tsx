import * as React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';

interface ActiveLinkProps {
  children: JSX.Element;
  activeClassName: string;
  as?: string;
  href: string;
}

const ActiveLink = ({
  children,
  activeClassName,
  ...props
}: ActiveLinkProps) => {
  const { asPath, isReady } = useRouter();

  const child = React.Children.only(children);
  const childClassName = child.props.className || '';
  const [className, setClassName] = React.useState(childClassName);

  React.useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL(props.as || props.href, location.href)
        .pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname;

      const newClassName =
        linkPathname === activePathname
          ? `${childClassName} ${activeClassName}`.trim()
          : childClassName;

      if (newClassName !== className) {
        setClassName(newClassName);
      }
    }
  }, [
    asPath,
    isReady,
    props.as,
    props.href,
    childClassName,
    activeClassName,
    setClassName,
    className,
  ]);

  React.useEffect(() => {}, []);

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

ActiveLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
};

export default ActiveLink;
