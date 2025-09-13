import mongoose from "mongoose";

const { Schema } = mongoose;

const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      // enum usecase: status should only be either of any 1 value from below
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is not suported`,
      },
    },
  },
  {
    timestamps: true,
  }
);

/* 
Compound indexing - documents are first sorted by userid in fromUserId order (alphabetically). Then, the toUserId for each fromUserId are sorted in ascending order.
MongoDB uses the WiredTiger storage engine (default since MongoDB 3.2).
The index is stored as a separate data structure on disk, alongside your collection data.
*/
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// Just before saving, this pre middleware hook will called. we can write validation etc. just before saving the record in db
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId))
    throw new Error("You can't send request to yourself");
  next();
});

const ConnectionRequest = mongoose.model(
  "ConnectionRequests",
  connectionRequestSchema
);

export { ConnectionRequest };
