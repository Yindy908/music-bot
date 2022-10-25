const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skipto")
        .setDescription("skips to a certain track")
        .addNumberOption((option) =>
            option.setName("tracknumber").setDescription("the track to skip to").setMinValue(1).setRequired(true)),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue)
            return await interaction.editReply("there are no songs in the queue")
            
            const trackNum = interaction.options.getNumber("tracknumber")

            if (trackNum > queue.tracks.length)
                return await interaction.editReply("Invalid track number")

            queue.skitTo(trackNum - 1)
            await interaction.editReply(`Skipped to track number ${trackNum}`)
    },
}