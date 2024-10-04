package types

const (
	EventTypeRecordBatch             = "record_batch"
	EventTypeCreateBridge            = "create_bridge"
	EventTypeProposeOutput           = "propose_output"
	EventTypeDeleteOutput            = "delete_output"
	EventTypeInitiateTokenDeposit    = "initiate_token_deposit"
	EventTypeFinalizeTokenWithdrawal = "finalize_token_withdrawal"
	EventTypeUpdateProposer          = "update_proposer"
	EventTypeUpdateChallenger        = "update_challenger"
	EventTypeUpdateBatchInfo         = "update_batch_info"
	EventTypeUpdateMetadata          = "update_metadata"
	EventTypeUpdateOracle            = "update_oracle"

	AttributeKeySubmitter              = "submitter"
	AttributeKeyCreator                = "creator"
	AttributeKeyProposer               = "proposer"
	AttributeKeyChallenger             = "challenger"
	AttributeKeyBatchChainType         = "batch_chain_type"
	AttributeKeyBatchSubmitter         = "batch_submitter"
	AttributeKeyBridgeId               = "bridge_id"
	AttributeKeyOutputIndex            = "output_index"
	AttributeKeyOutputRoot             = "output_root"
	AttributeKeyL2BlockNumber          = "l2_block_number"
	AttributeKeyFrom                   = "from"
	AttributeKeyTo                     = "to"
	AttributeKeyAmount                 = "amount"
	AttributeKeyL1Denom                = "l1_denom"
	AttributeKeyL2Denom                = "l2_denom"
	AttributeKeyData                   = "data"
	AttributeKeyL1Sequence             = "l1_sequence"
	AttributeKeyL2Sequence             = "l2_sequence"
	AttributeKeyFinalizedOutputIndex   = "finalized_output_index"
	AttributeKeyFinalizedL2BlockNumber = "finalized_l2_block_number"
	AttributeKeyOracleEnabled          = "oracle_enabled"
)
