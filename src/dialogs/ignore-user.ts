import * as builder from "botbuilder";
import * as datefns from "date-fns";
import { SettingsStore, ISettings } from "../stores";

export const IgnoreUserLuisName = "IgnoreUser";
export const IgnoreUserDialog: builder.IDialogWaterfallStep[] = [
  async function sendIgnoreMessage(session, args, next) {
    // try extracting entities
    var muteForDays = builder.EntityRecognizer.findEntity(
      args.entities,
      "builtin.number"
    );

    var muteUntillDate = builder.EntityRecognizer.resolveTime(args.entities);

    // fallback: mute for 1 day
    var tomorrow = datefns.addDays(new Date(), 1);

    var ignoreUntill: Date = tomorrow;

    if (muteUntillDate) {
      ignoreUntill = muteUntillDate;
    } else if (muteForDays && muteForDays.entity > 0) {
      ignoreUntill = datefns.addDays(new Date(), 1);
    } else {
      ignoreUntill = tomorrow;
    }

    var message = new builder.Message();
    message.text(
      "I won't contact you untill at least " +
        datefns.format(ignoreUntill, "dd/MM")
    );

    const userId = session.message.user.name;
    const channel = session.message.source;
    const settings: ISettings = await SettingsStore.GetSettingsById(
      userId,
      channel
    );
    const newSettings: ISettings = {
      botMutedUntill: ignoreUntill,
      channelId: settings.channelId,
      userId: settings.userId
    };

    await SettingsStore.SaveSettingsById(userId, newSettings);
  }
];
