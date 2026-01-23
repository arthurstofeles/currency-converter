# Currency Converter

Esta é uma aplicação em Angular(19.2.19), que vai exibir a quantia equivalente a R$ 1,00 (BRL) em Dólar Canadense (CAD), Peso Argentino (ARS) eLibra Esterlina (GBP). 

O projeto foi desenvolvido com foco nos seguintes pontos:
-   Boas práticas de arquitetura    
-   Programação reativa com RxJS    
-   Componentes desacoplados    
-   Pipes customizados    
-   Testes unitários    
-   Facilidade de execução (com ou sem Docker)

Ele apresentas as seguintes funcionalidades: 
-   Cotação das moedas **CAD, ARS e GBP**    
-   Cache em `localStorage` com tempo de expiração    
-   Atualização automática após expirar o cache    
-   Estados de **loading**, **erro** e **sucesso**    
-   Pipes customizados para:    
    -   Formatação de valor em Real (BRL)        
    -   Cor dinâmica baseada no valor        
-   Testes unitários para serviços, componentes e pipes    
-   Execução simples via **Docker** ou ambiente local

Decisões de Arquitetura
-   Uso de **Standalone Components** para maior desacoplamento    
-   **Services** responsáveis por regras de negócio e cache    
-   **Pipes** isolam regras de formatação e UI    
-   Cache em `localStorage` com estratégia de expiração    
-   Controle de atualização automática via **RxJS (timer + interval)**

Principais tecnologias utilizadas: 
-   **Angular (Standalone Components)**    
-   **RxJS**    
-   **TypeScript**    
-   **SCSS**    
-   **Jasmine + Karma**    
-   **Docker**

Pré requisitos para rodar o projeto: 
-   Node.js **20.13.1**    
-   npm **10.5.2**    
-   Angular CLI  **19.2.19**
-   Docker **4.57.0**

### Rodando o projeto sem Docker
1. Instalar as dependências: `npm install`
2. Subir o servidor de desenvolvimento: `npm start` ou `ng serve`
3. Acessar pelo navegador: `http://localhost:4200`

### Rodando o projeto com Docker
1. Gerar a build e a imagem Docker: `docker build -t currency-converter .`
2. Subir o container: `docker run -p 8080:80 currency-converter`
3. Acessar pelo navegador: `http://localhost:8080`

### Rodando com Makefile
1. Gerar a build e a imagem Docker: `make build`
2. Subir o container: `make run`
3. Acessar pelo navegador: `http://localhost:8080`

### Rodando testes
1. Executar todos os testes: `npm test`
2. Executar testes em modo watch: `ng test`
3. Executar um teste específico (ex: CurrencyService): `ng test --include=**/src/app/core/services/currency.service.ts`

