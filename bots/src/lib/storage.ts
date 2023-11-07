import { MerkleTree } from 'merkletreejs';
import { BCS } from '@initia/minitia.js';
import { sha3_256 } from './util';
import { WithdrawalTx } from './types';
import { computeBridgeAddress } from './lcd';
import { WalletType, getWallet } from './wallet';

export class WithdrawalStorage {
  public bcs = BCS.getInstance();
  private tree: MerkleTree;

  constructor(txs: WithdrawalTx[]) {
    const leaves = txs.map((tx) =>
      sha3_256(
        Buffer.concat([
          Buffer.from(this.bcs.serialize(BCS.U64, tx.sequence), 'base64'),
          Buffer.from(this.bcs.serialize(BCS.ADDRESS, tx.sender), 'base64'),
          Buffer.from(this.bcs.serialize(BCS.ADDRESS, tx.receiver), 'base64'),
          Buffer.from(this.bcs.serialize(BCS.U64, tx.amount), 'base64'),
          Buffer.from(
            this.bcs.serialize(BCS.OBJECT, computeBridgeAddress(getWallet(WalletType.Executor).key.accAddress, tx.l2_id)),
            'base64'
          ),
          Buffer.from(this.bcs.serialize(BCS.OBJECT, tx.metadata), 'base64')
        ])
      )
    );

    this.tree = new MerkleTree(leaves, sha3_256, { sort: true });
  }

  public getMerkleRoot(): string {
    return this.tree.getHexRoot().replace('0x', '');
  }

  public getMerkleProof(tx: WithdrawalTx): string[] {
    return this.tree
      .getHexProof(
        sha3_256(
          Buffer.concat([
            Buffer.from(this.bcs.serialize(BCS.U64, tx.sequence), 'base64'),
            Buffer.from(this.bcs.serialize(BCS.ADDRESS, tx.sender), 'base64'),
            Buffer.from(this.bcs.serialize(BCS.ADDRESS, tx.receiver), 'base64'),
            Buffer.from(this.bcs.serialize(BCS.U64, tx.amount), 'base64'),
            Buffer.from(
              this.bcs.serialize(BCS.OBJECT, computeBridgeAddress(getWallet(WalletType.Executor).key.accAddress, tx.l2_id)),
              'base64'
            ),
            Buffer.from(this.bcs.serialize(BCS.OBJECT, tx.metadata), 'base64')
          ])
        )
      )
      .map((v) => v.replace('0x', ''));
  }

  public verify(proof: string[], tx: WithdrawalTx): boolean {
    let hashBuf = sha3_256(
      Buffer.concat([
        Buffer.from(this.bcs.serialize(BCS.U64, tx.sequence), 'base64'),
        Buffer.from(this.bcs.serialize(BCS.ADDRESS, tx.sender), 'base64'),
        Buffer.from(this.bcs.serialize(BCS.ADDRESS, tx.receiver), 'base64'),
        Buffer.from(this.bcs.serialize(BCS.U64, tx.amount), 'base64'),
        Buffer.from(
          this.bcs.serialize(BCS.OBJECT, computeBridgeAddress(getWallet(WalletType.Executor).key.accAddress, tx.l2_id)),
          'base64'
        ),
        Buffer.from(this.bcs.serialize(BCS.OBJECT, tx.metadata), 'base64')
      ])
    );

    for (const proofElem of proof) {
      const proofBuf = Buffer.from(proofElem, 'hex');
      hashBuf =
        Buffer.compare(hashBuf, proofBuf) === -1
          ? sha3_256(Buffer.concat([hashBuf, proofBuf]))
          : sha3_256(Buffer.concat([proofBuf, hashBuf]));
    }

    return this.getMerkleRoot() === hashBuf.toString('hex');
  }
}