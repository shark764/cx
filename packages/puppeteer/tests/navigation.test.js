describe('Navigation', () => {

  it('admin url navigation works', async () => {
    await page.goto('http://localhost:3000/#/admin');
    await expect(page.url()).toMatch('http://localhost:3000/#/admin');
  });

  it('admin organization navigation links work', async () => {
    await page.click('.OrganizationLink');
    await expect(page.url()).toMatch('http://localhost:3000/#/admin/organization');
  });

  it('admin activity management links work', async () => {
    await page.click('.ActivityManagementLink');
    await expect(page.url()).toMatch('http://localhost:3000/#/admin/activity-management');
  });

  it('admin competence management links work', async () => {
    await page.click('.CompetenceManagementLink');
    await expect(page.url()).toMatch('http://localhost:3000/#/admin/competence-management');
  });

  it('admin day types links work', async () => {
    await page.click('.DayTypesLink');
    await expect(page.url()).toMatch('http://localhost:3000/#/admin/day-types');
  });

  it('admin default restriction links work', async () => {
    await page.click('.DefaultRestrictionLink');
    await expect(page.url()).toMatch('http://localhost:3000/#/admin/default-restriction');
  });


  it('agent url navigation works', async () => {
    await page.goto('http://localhost:3000/#/agent');
    await expect(page.url()).toMatch('http://localhost:3000/#/agent');
  });

  it('agent schedule navigation links work', async () => {
    await page.click('.ScheduleLink');
    await expect(page.url()).toMatch('http://localhost:3000/#/agent/schedule');
  });

  it('agent availability links work', async () => {
    await page.click('.AvailabilityLink');
    await expect(page.url()).toMatch('http://localhost:3000/#/agent/availability');
  });


  it('forecasting url navigation works', async () => {
    await page.goto('http://localhost:3000/#/forecasting');
    await expect(page.url()).toMatch('http://localhost:3000/#/forecasting');
  });

  it('forecasting settings navigation links work', async () => {
    await page.click('.SettingsLink');
    await expect(page.url()).toMatch('http://localhost:3000/#/forecasting/settings');
  });

  it('forecasting navigation links work', async () => {
    await page.click('.ForecastLink');
    await expect(page.url()).toMatch('http://localhost:3000/#/forecasting');
  });

  it('planning url navigation works', async () => {
    await page.goto('http://localhost:3000/#/planning');
    await expect(page.url()).toMatch('http://localhost:3000/#/planning');
  });

  it('planning schedule navigation links work', async () => {
    await page.click('.ScheduleLink');
    await expect(page.url()).toMatch('http://localhost:3000/#/planning/schedule');
  });

  it('planning employees links work', async () => {
    await page.click('.EmployeesLink');
    await expect(page.url()).toMatch('http://localhost:3000/#/planning/employees');
  });

  it('planning settings links work', async () => {
    await page.click('.SettingsLink');
    await expect(page.url()).toMatch('http://localhost:3000/#/planning/settings');
  });


});