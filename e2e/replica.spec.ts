import { test, expect } from '@playwright/test';
test('home e LGPD preservam composição e acesso facial',async({page})=>{
 await page.goto('http://127.0.0.1:5173/?view=app');
 await expect(page.getByText('Meus cartões BHBus',{exact:true})).toBeVisible();
 await expect(page.locator('.reference-tile')).toHaveCount(13);
 await page.getByRole('button',{name:'LGPD',exact:true}).click();
 await expect(page.getByRole('heading',{name:'LGPD',exact:true})).toBeVisible();
 await expect(page.getByRole('link',{name:'lgpd@transfacil.com.br'})).toBeVisible();
 await page.getByRole('button',{name:'Voltar ao início'}).click();
 await page.getByRole('button',{name:'Embarque facial',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Embarque facial',exact:true})).toBeVisible();
});
test('validador mantém cartão QR e fluxo facial com permissões',async({page})=>{
 await page.goto('http://127.0.0.1:5173/?view=totem');
 await expect(page.getByText('APRESENTE SEU CARTÃO',{exact:true})).toBeVisible();
 await page.locator('.totem-qr-banner').click();
 await expect(page.getByText('APRESENTE SEU QR CODE',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Usar embarque facial',exact:true}).click();
 await page.getByLabel('Perfil no validador').selectOption('guest-demo');
 await page.getByLabel('Linha no validador').selectOption('4102');
 await page.getByRole('button',{name:'Simular embarque',exact:true}).click();
 await expect(page.getByText('NÃO AUTORIZADO',{exact:true})).toBeVisible();
 await page.getByLabel('Linha no validador').selectOption('5104');
 await page.getByRole('button',{name:'Simular embarque',exact:true}).click();
 await expect(page.getByText('BOA VIAGEM!',{exact:true})).toBeVisible();
});
test('gravação app e totem remove painel e permite sair',async({page})=>{
 await page.goto('http://127.0.0.1:5173');
 await page.getByRole('button',{name:'Gravar app',exact:true}).click();
 await expect(page.locator('.replica-toolbar')).toHaveCount(0);
 await expect(page.locator('.totem-cabinet')).toHaveCount(0);
 await page.getByRole('button',{name:'Sair do modo gravação'}).click();
 await page.getByRole('button',{name:'Gravar totem',exact:true}).click();
 await expect(page.locator('.totem-cabinet')).toBeVisible();
 await expect(page.locator('.totem-controls')).toHaveCount(0);
});
test('capturas app LGPD totem desktop e móvel sem overflow',async({page})=>{
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:1000});
  await page.goto('http://127.0.0.1:5173');
  await page.evaluate(()=>document.fonts.ready);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  await page.screenshot({path:`.impeccable/review/replica-${width}.png`,fullPage:true});
 }
 await page.goto('http://127.0.0.1:5173/?view=app&record=1');
 await page.screenshot({path:'.impeccable/review/app-recording.png',fullPage:true});
 await page.getByRole('button',{name:'LGPD',exact:true}).click();
 await page.screenshot({path:'.impeccable/review/lgpd.png',fullPage:true});
 await page.goto('http://127.0.0.1:5173/?view=totem&record=1');
 await page.screenshot({path:'.impeccable/review/totem-recording.png',fullPage:true});
});
