import { test, expect } from '@playwright/test';
test('permissões, saldo, revogação e cadastro funcionam na interface', async ({page})=>{
 await page.goto('http://127.0.0.1:5173');await page.getByRole('button',{name:'Embarque facial',exact:true}).click();
 await page.getByRole('button',{name:'Simular embarque'}).click();
 await expect(page.getByText('Boa viagem!',{exact:true})).toBeVisible();
 await expect(page.locator('.balance')).toHaveText('R$ 30,00');
 await page.getByLabel('Perfil para testar').selectOption('guest-demo');
 await page.getByLabel('Linha do ônibus').selectOption('4102');
 await page.getByRole('button',{name:'Simular embarque'}).click();
 await expect(page.getByText('Embarque não autorizado',{exact:true})).toBeVisible();
 await expect(page.locator('.balance')).toHaveText('R$ 30,00');
 const jo=page.locator('.person').filter({hasText:'Jo Demo'});
 await jo.getByRole('checkbox',{name:'Autorizar linha 4102 para Jo Demo',exact:true}).check();
 await page.getByRole('button',{name:'Simular embarque'}).click();
 await expect(page.getByText('Boa viagem!',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Revogar autorização de Jo Demo'}).click();
 await page.getByRole('button',{name:'Simular embarque'}).click();
 await expect(page.locator('.stage-message')).toContainText('revogada');
 await page.getByLabel('Cadastrar convidado fictício').fill('Lua Demo');
 await page.getByRole('button',{name:'Adicionar convidado'}).click();
 await expect(page.locator('.person').filter({hasText:'Lua Demo'})).toBeVisible();
 await page.getByRole('button',{name:'Reiniciar demonstração'}).click();
 await expect(page.locator('.balance')).toHaveText('R$ 35,00');
 await expect(page.locator('.person')).toHaveCount(2);
 await page.getByRole('switch').click();
 await page.getByRole('button',{name:'Simular embarque'}).click();
 await expect(page.locator('.stage-message')).toContainText('desativado');
});
test('desktop e móvel não apresentam overflow; captura',async({page})=>{
 for(const [name,width,height] of [['desktop',1440,1100],['mobile',390,844]] as const){
  await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:5173');await page.getByRole('button',{name:'Embarque facial',exact:true}).click();
  await page.evaluate(()=>document.fonts.ready);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  await page.screenshot({path:`.impeccable/review/${name}.png`,fullPage:true});
 }
});
test('falha da câmera permite continuar em simulação',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(navigator,'mediaDevices',{value:{getUserMedia:()=>Promise.reject(new Error('denied'))}});});
 await page.goto('http://127.0.0.1:5173');await page.getByRole('button',{name:'Embarque facial',exact:true}).click();
 await page.getByRole('button',{name:'Usar minha câmera'}).click();
 await expect(page.getByRole('status')).toContainText('Câmera indisponível');
 await page.getByRole('button',{name:'Simular embarque'}).click();
 await expect(page.getByText('Boa viagem!',{exact:true})).toBeVisible();
});

test('apelidos longos preservam o layout móvel e o cadastro funciona por teclado',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('http://127.0.0.1:5173');await page.getByRole('button',{name:'Embarque facial',exact:true}).click();
 const name='W'.repeat(32);
 await page.getByLabel('Cadastrar convidado fictício').fill(name);
 await page.getByLabel('Cadastrar convidado fictício').press('Enter');
 await expect(page.locator('.person').filter({hasText:name})).toBeVisible();
 await page.getByLabel('Perfil para testar').selectOption({label:name});
 await page.getByRole('button',{name:'Simular embarque'}).click();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 await page.screenshot({path:'.impeccable/review/mobile-long-name.png',fullPage:true});
});
