import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
};

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';  
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {

    return this.transactions;

  }

  public getBalance(): Balance {
    // TODO

    const {income, outcome} = this.transactions.reduce((balance, transaction) => {
      transaction.type === 'income' ? balance.income += transaction.value : balance.outcome += transaction.value;
      return balance;
    },{
      income:0,
      outcome:0,
    });

    const total = income - outcome;

    return {income, outcome, total};

  } 

  public create({title, value, type}: CreateTransactionDTO ): Transaction {
    const transaction = new Transaction({title, value, type});
    this.transactions.push(transaction);
    return transaction;
  }
}




export default TransactionsRepository;
