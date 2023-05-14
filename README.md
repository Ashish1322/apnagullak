# Apnagullak

Apna Gullak Wallet is a digital wallet application that provides a unique facility to parents to create a mini wallet 
for their children and set a limit for their transactions. With Apna Gullak Wallet,
parents can give their children the opportunity to learn the value of money and financial
responsibility by providing them with their own wallet to manage. The best part is that children don't 
need to open any account until they reach the age of 18. 
They can access their parent's account where they can spend the money that has been allocated to them.
This application is designed to help parents manage their child's expenses and ensure that they are spending their money wisely.

# Objective

Children these days at young age have started taking pocket money from their parents but they often lack in financial literacy and responsibility because of young age . Due to which parents often struggle to effectively educate their kids about money management can result in later spending problems, debt, and unstable finances when they grow up . In addition, parents frequently find it difficult to watch and regulate their kids' spending, which can lead to them overspending on frivolous purchases and leaving little room for essential expenses.

In this situation, parents have access to their children's e-piggy banks or GULLAKs, which can help them monitor how and to whom their children are transferring money. We've added a few features that allow parents to set up numerous accounts on the application, transfer money between them, and keep an eye on each one's spending. This would also assist parents in managing their own finances and ensuring that they are effectively allocating their resources to meet the requirements of their children. When parents believe their children are not making sensible purchases, they can also block their children accounts.

# Methodology

The methodology of Apna Gullak Wallet involves the following steps:

**Registration:** Parents can register themselves and their children on the app by providing their personal information.

**Mini Wallet Creation:** Parents can create a mini wallet for their children within their own account, 
and set a limit on the amount of money that can be spent from that wallet.

**Add Funds:** Parents can add funds to their child's mini wallet as per their discretion.

**Expense Tracking:** The app allows parents to track their child's expenses in real-time and categorize them into different
categories such as food, education, entertainment, etc.

**Notifications:** The app sends notifications to parents whenever their child makes a transaction from their mini wallet.

**Parental Control:** Parents have complete control over their child's mini wallet and can monitor and control their spending. Parents can also block child account any time and they can also set the trnasaction amount limit in order to restrict the huge transactons.

**No Account for Child:** The app does not require the child to open a separate account, and they can access their parent's account 
to spend the money that has been allocated to them.

**Financial Literacy:** The app aims to promote financial literacy among children by providing them with a platform to manage their own 
money and make informed financial decisions from a young age.



## How to Run & Test
In order to run this project, Nodejs and Expo must be properly configured in your system. 

Stripe is being used in this project, so you also need the Credentials for the stripe API's. You have to paste your stripe keys in the project files inside the **server/index.js** & **App.js** of root project.


 Clone Repo 

```bash
  git clone https://github.com/Ashish1322/apnagullak.git
```

Install dependencies for project

```bash
  npm install 
```

Move in server directory

```bash
  cd server 
```

Install dependencies for server

```bash
  npm install 
```

Start Server

```bash
  nodemon index.js 
```

Come back to root directory of project

```bash
  cd .. 
```

Start Project

```bash
  expo start
```






## Tech Stack

**Client:** React Native, Expo, Context API

**Server:** Node, Express

**Database:** Firestore (Google Cloud)

**Authenticaion:** Firebase

**Hosting:** AMD (N2D) Instance is used for hosting Express API on Google Cloud

## Results

![App Screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhColwwWgY9xHGcSbAhV_Rdh6h5jqkquXlzPvG84NxL8IeSjycw3d5sNQN8p18PrwZt8e2ut3sk95VQag8vGXXv-4mHsr6G_0iz1begCdGw0f3HrPlU8pkMrDjPruYjHjRLNIpxp4MotzrJ7XIa8EhY4nsDF0-p4YX7ySxR8j2I1vuO2yA2QZz0WnE/s320/Screenshot_2023-04-02-16-34-50-43_f73b71075b1de7323614b647fe394240.jpg) 
![App Screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHMj_bEcwW72PZ9nhtqhTvx_iN8vnL3VY5x7kMSsvtHcfurdEk3OSaGN2Rr2WgfTvpmsSUR7VAxCcyHp32kzcLTLq6neDjed_Uc9-VkCMfGVgAyXEbhCdJI-wbwvPulBDFzOyY0EXQi-Scu3fuRECQoquL46Pan5D-p1JPMx0ZgQehmcTnKVTi5i0/s320/Screenshot_2023-04-02-16-34-54-28_f73b71075b1de7323614b647fe394240.jpg)
![App Screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjT5XDwodWyD0pSib9a_EQr_SixcSD2qR3mx96lHUvvqMEbtUWe2uW_4PIZoV7-sv0Mwh9IyIV7-pfvWBjx7iXQ6jw-up2RWU6A17tZN_JcU22MtmLwYgVceRfJG_GfPM_v-7ytV5odLRw2K6uhm--PUmBG1syAkktiil1G8nvZvZIpkakJMiSKLwA/s320/Screenshot_2023-04-02-16-34-59-04_f73b71075b1de7323614b647fe394240.jpg)
![App Screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrGFI483RDWYUlRn5_1M9F3WvwcI4wmfnr4YzVSPaAiK04-X1ejCBuV8G8DZlNnh-nEGZ7duIO1AqGgBsZolo_ZgnnH9mvt0T8X-LfiOId8Mfh1X7UHWrASsyDx_yOIYRsGfFy9RuPPmeDj2QTVktMjxlrX_djHH0bM5SmOPN4zUTbwGWyP6CF3jE/s320/Screenshot_2023-04-02-16-35-40-24_f73b71075b1de7323614b647fe394240.jpg)
![App Screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjAlEZfU518zSivI4m_ouJZKJnS3Z6BF5NyMVhTjJRcianx56yLBfDHKtbsxRMxT1zeFsJVBcNQIRW13OJHkJGIp50vShqzsON-JqJnP0gXLvsLDdIKX_mzFIlw7325z7ii514yWMTpqB37Dcxl62caJKFz1HsEXJD1ROBAJDT6Y7oouRsA_uqZvXE/s320/Screenshot_2023-04-02-16-35-43-65_f73b71075b1de7323614b647fe394240.jpg)
![App Screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiX2khTDkuQlLXfAWasUoyw2U6lLSEI5WLxL0oHJ2mHWCOO0KJgronMqOql0HjDkYnvGDIPYi_V6F94WxFgCvbx7-VE31EGoeMYA-NGPWUzlVQbon6vUwjOvuzy0aVsAzF3vqBZIj5rOhTPpGtbXaXJ4j-myBYg912evOQfhoGQYhpktLW6hsf4ACQ/s320/Screenshot_2023-04-02-16-35-49-08_f73b71075b1de7323614b647fe394240.jpg)
![App Screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgispLAWGRZ5y3-dPAE9qs7NHZk5VgL9nb9o3wXbGl6TavpE3kl3MeqnvA6RhSQBlM2e5hdsyOJTmByh539-9U99R92h2iEvqdXjMlOhyrZd-Fdd2Rd66499VKXX0FNvq656HYUG611k5L6UErtA_A8pa_9lyKF1K7vWOhbzK0FUXh-AN6BmOo4svw/s320/Screenshot_2023-04-02-16-35-58-60_f73b71075b1de7323614b647fe394240.jpg)
![App Screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpW2p_r22ico0sD3CivSdonAXkxiNPPc6yKlV93CbSAzCUD7M35lwPuQ3PvSEdtnLUoc1fsbi3JNTO8E2tgxp324YwjPYvi7DA4R26k8Iq5W_ZbVOWbPx4MLhQFAwv1TXCEfgsJYjHjRUK6jVM7yIOlcldk2C0lsOrpVI6tENkjV3aLEwaWrtFdqw/s320/Screenshot_2023-04-02-16-36-41-88_f73b71075b1de7323614b647fe394240.jpg)
![App Screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjj0NE2i1OBy8stOkcwy3v1qsm-aGyb_sFq17L3OL2iT2GFJFfcE7LzUr-Q-ZQgsGHJ8gBO-jGNSHYk6F9fu7WuD5_HxLB6q77ycBGQe2Zw68TgXbEsN0qXvmoCXfuyhk4TrWuJe6Lu5ZYz-5ZH7CQgOposzGb47j1A2kM0Rs3VCMjSEy94hbRAGGo/s320/Screenshot%202023-05-14%20at%2011.04.00%20AM.png)
![App Screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5s7DGGDFJLwrBzgP4Isws5Af6B7uw0sWrzFBOdtNmgvMuwrsSPDORSC6wnsBsJibgCZvrx7G6age2Izx4sBe6MUDH9LJPSl0MKwsYwbgvKV50es5ODcXFfm7q_ZLWGSJnjSDLQIIKK5cf-z5ueXlRZ46SFWEREw3CmsRsPWVmV3DYxuPUYfK-Ri8/s320/Screenshot%202023-05-14%20at%2011.04.13%20AM.png)




## Authors

- [@ashish1322](https://github.com/Ashish1322/)
- [@planetkumbhaj](https://github.com/PlanetKumbhaj)
- [@itsayu](https://github.com/itsayu)
- [@shuchi111](https://github.com/shuchi111)


