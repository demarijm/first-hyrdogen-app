import {ShopifyServerProvider, DefaultRoutes} from '@shopify/hydrogen';
import {Switch} from 'react-router-dom';
import {Suspense} from 'react';
import Measuring from './pages/pages/Measuring';

import shopifyConfig from '../shopify.config';

import DefaultSeo from './components/DefaultSeo.server';
import NotFound from './components/NotFound.server';
import CartProvider from './components/CartProvider.client';
import LoadingFallback from './components/LoadingFallback';

export default function App({...serverState}) {
  const pages = import.meta.globEager('./pages/**/*.server.[jt]sx');

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ShopifyServerProvider shopifyConfig={shopifyConfig} {...serverState}>
        <CartProvider>
          <DefaultSeo />
          <Switch>
            <DefaultRoutes
              pages={pages}
              serverState={serverState}
              fallback={<Measuring />}
            />
          </Switch>
        </CartProvider>
      </ShopifyServerProvider>
    </Suspense>
  );
}
