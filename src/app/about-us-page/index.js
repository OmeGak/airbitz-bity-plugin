import React from 'react';

import Page from '../lib/page';
import { Card, CardHeader, CardBody } from '../lib/card';

export default function AboutUsPage() {
  return (
    <Page>
      <Card>
        <CardHeader>
          <span>About Us</span>
        </CardHeader>
        <CardBody>
          <span>If you can’t find your answer, feel free to contact us
          at <a href="mailto:support@bity.com">support@bity.com</a></span>
        </CardBody>
      </Card>
    </Page>
  );
}
